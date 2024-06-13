// This makes sure all functions exported from here are marekd as server functions
'use server';
import { signIn } from '@/auth';
import { sql } from '@vercel/postgres';
import { AuthError } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
// We use zod for data validation
import { z } from 'zod';

import bcrypt from 'bcryptjs';
import { Activity, Site, TaskStatus, User, Worker } from './models';

const BASE_URL = process.env.API_BASE_URL;
// We create a form schema taking into accoun the possible errors and warning
// Great for data validation
const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
});

// UserCreationFormSchema
const UserCreationFormSchema = z.object({
  id: z.string(),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters long.',
  }),
  name: z.string({
    invalid_type_error: 'Please enter a name.',
  }),
  role: z.string({
    invalid_type_error: 'Please enter your profession or role.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
});

const WorkerFormSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
});

const SiteFormSchema = z.object({
  id: z.number().optional(),
  name: z.string().max(255, 'Name must be at most 255 characters long.'),
  latitude: z.coerce
    .number()
    .gte(-180, { message: 'Latitude must be between -180° to 180°' })
    .lte(180, { message: 'Latitude must be between -180° to 180°' }),
  longitude: z.coerce
    .number()
    .gte(-180, { message: 'Longitude must be between -90° to 90°' })
    .lte(180, { message: 'Longitude must be between -90° to 90°' }),
  town: z.string().max(255, 'Town must be at most 255 characters long.'),
  country: z.string().max(255, 'Country must be at most 255 characters long.'),
  region: z.string().max(255, 'Region must be at most 255 characters long.'),
  description: z.string().optional(),
});

const ActivityFormSchema = z.object({
  id: z.number().optional(),
  name: z.string().max(255, 'Name must be at most 255 characters long.'),
  description: z.string(),
});

// This is temporary until @types/react-dom is updated
export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export type WorkerState = {
  errors?: {
    id?: string[];
    name?: string[];
  };
  message?: string | null;
};

export type UserState = {
  errors?: {
    name?: string[];
    id?: string[];
    role?: string[];
    password?: string[];
    email?: string[];
  };
  message?: string | null;
};

export type SiteState = {
  errors?: {
    id?: string[];
    name?: string[];
    latitude?: string[];
    longitude?: string[];
    town?: string[];
    country?: string[];
    region?: string[];
    description?: string[];
  };
  message?: string | null;
};

export type ActivityState = {
  errors?: {
    name?: string[];
    description?: string[];
  };
  message?: string | null;
};

// Validators
const CreateActivity = ActivityFormSchema.omit({ id: true });
const UpdateActivity = ActivityFormSchema.omit({ id: true });

const CreateUser = UserCreationFormSchema.omit({ id: true });
const CreateSite = SiteFormSchema.omit({ id: true });
const UpdateSite = SiteFormSchema.omit({ id: true });
const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });
const CreateWorker = WorkerFormSchema.omit({ id: true });
const UpdateWorker = WorkerFormSchema.omit({ id: true });

/**
 * Notice that formData is passed automatically by setting this to the action attribute of a form
 * @param formData
 */
export async function createInvoice(prevState: State, formData: FormData) {
  // Validate and returns the 3 fields else fails
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }
  // Prepare data for insertion into the database
  const { customerId, amount, status } = validatedFields.data;
  // Stores the amount in cents
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  try {
    await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Update Invoice.',
    };
  }
  // Test it out
  // TO avoid back navigation after the form has been created
  revalidatePath('/dashboard/invoices');
  // Redirect the user
  redirect('/dashboard/invoices');
}

export async function updateInvoice(
  id: string,
  state: State,
  formData: FormData,
) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;

  try {
    await sql`
    UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}
  `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Update Invoice.',
    };
  }
  revalidatePath('/dashboard/invoices');
  // Note that redirect throws an error inorder to function and so we shoulnot use it inside a try catch block
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
  } catch (error) {
    console.error(error);
  }
}

export async function signinUser(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong. User may not exist';
      }
    }
  }
  revalidatePath('/login');
  redirect('/dashboard');
}

export async function signupUser(prevState: UserState, formData: FormData) {
  // We create the user the we navigate to the login
  const validatedFields = CreateUser.safeParse({
    name: formData.get('name'),
    role: formData.get('role'),
    email: formData.get('email'),
    password: formData.get('password'),
  });
  // console.log(`Validation=${validatedFields.}`)

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create user.',
    };
  }
  console.log(validatedFields.data);
  const data = validatedFields.data;
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const newUser: User = {
    id: '',
    password: hashedPassword,
    name: data.name,
    role: data.role,
    email: data.email,
  };
  console.log(newUser);

  try {
    const response = await fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });

    if (!response.ok) {
      throw new Error('Failed to create user');
    }

    const createdUser = await response.json();
    console.log(`user created:${createdUser} `);
  } catch (error) {
    console.error(error);
    return { message: 'Error creating user' };
  }
  revalidatePath('/signup');
  // Note that redirect throws an error inorder to function and so we shoulnot use it inside a try catch block
  redirect('/login');
}

export async function createSite(prevState: SiteState, formData: FormData) {
  // We create the user the we navigate to the login
  const validatedFields = SiteFormSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
    region: formData.get('region'),
    country: formData.get('country'),
    town: formData.get('town'),
    latitude: formData.get('latitude'),
    longitude: formData.get('longitude'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Site.',
    };
  }

  const site: Site = {
    id: 0,
    ...validatedFields.data,
  };

  console.log(site);

  try {
    const response = await fetch(`${BASE_URL}/sites`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(site),
    });

    if (!response.ok) {
      throw new Error('Failed to create site');
    }

    const createdSite = await response.json();
    console.log(`site created:${createdSite} `);
  } catch (error) {
    console.error(error);
    return { message: 'Error creating site' };
  }
  revalidatePath('/dashboard/sites');
  // Note that redirect throws an error inorder to function and so we shoulnot use it inside a try catch block
  redirect('/dashboard/sites');
}
export async function updateSite(
  id: number,
  oldSite: Site,
  prevState: SiteState,
  formData: FormData,
) {
  // We create the user the we navigate to the login
  const validatedFields = SiteFormSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
    region: formData.get('region'),
    country: formData.get('country'),
    town: formData.get('town'),
    latitude: formData.get('latitude'),
    longitude: formData.get('longitude'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create user.',
    };
  }

  const site: Site = {
    id: 0,
    ...validatedFields.data,
  };

  console.log(site);

  try {
    const response = await fetch(`${BASE_URL}/sites/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(site),
    });

    if (!response.ok) {
      throw new Error('Failed to update site');
    }

    const createdSite = await response.json();
  } catch (error) {
    console.error(error);
    return { message: 'Error updating site' };
  }
  revalidatePath('/dashboard/sites');
  // Note that redirect throws an error inorder to function and so we shoulnot use it inside a try catch block
  redirect('/dashboard/sites');
}

export async function createActivity(
  siteId: number,
  prevState: ActivityState,
  formData: FormData,
) {
  // We create the user the we navigate to the login
  const validatedFields = CreateActivity.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to create activity.',
    };
  }

  const activity: Activity = {
    id: 0,
    ...validatedFields.data,
    tasks: [],
  };

  console.log(activity);

  try {
    const response = await fetch(`${BASE_URL}/sites/${siteId}/activities`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(activity),
    });

    if (!response.ok) {
      throw new Error('Failed to create site');
    }

    const createdSite = await response.json();
    console.log(`site created:${createdSite} `);
  } catch (error) {
    console.error(error);
    return { message: 'Error creating site' };
  }

  revalidatePath(`/dashboard/sites/${siteId}/activities`);
  redirect(`/dashboard/sites/${siteId}/activities`);
  // Note that redirect throws an error inorder to function and so we shoulnot use it inside a try catch block
}
export async function updateActivity(
  oldActivity: Activity,
  siteId: number,
  prevState: ActivityState,
  formData: FormData,
) {
  // We create the user the we navigate to the login
  const validatedFields = UpdateActivity.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create user.',
    };
  }

  const activity: Activity = {
    id: oldActivity.id,
    ...validatedFields.data,
    tasks: [],
  };

  console.log(activity);

  try {
    const response = await fetch(
      `${BASE_URL}/sites/${siteId}/activities/${activity.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(activity),
      },
    );

    if (!response.ok) {
      throw new Error('Failed to update activity');
    }

    const createdActivity = await response.json();
    console.log(createdActivity);
  } catch (error) {
    console.error(error);
    return { message: 'Error updating activity' };
  }
  revalidatePath(`/dashboard/sites/${siteId}/activities`);
  redirect(`/dashboard/sites/${siteId}/activities`);
}

export async function deleteSite(id: string) {
  try {
    const response = await fetch(`${BASE_URL}/sites/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete site');
    }
    console.log(`Successful Deletion `);
    revalidatePath('/dashboard/sites');
    //   // Note that redirect throws an error inorder to function and so we shoulnot use it inside a try catch block
  } catch (error) {
    console.error(error);
    return { message: 'Error deleting site' };
  }
}

export async function deleteActivity(id: string, siteId: number) {
  try {
    const response = await fetch(
      `${BASE_URL}/sites/${siteId}/activities/${id}`,
      {
        method: 'DELETE',
      },
    );

    if (!response.ok) {
      throw new Error('Failed to delete activity');
    }
    console.log(`Successful Deletion `);
    revalidatePath(`/dashboard/sites/${siteId}/activities`);
    //   // Note that redirect throws an error inorder to function and so we shoulnot use it inside a try catch block
  } catch (error) {
    console.error(error);
    return { message: 'Error deleting Activity' };
  }
}

// To CUD worker
export async function createWorker(prevState: WorkerState, formData: FormData) {
  const validatedFields = WorkerFormSchema.safeParse({
    name: formData.get('name'),
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to create worker.',
    };
  }

  const worker: Worker = {
    id: 0, // or a proper id if available
    ...validatedFields.data,
  };

  try {
    const response = await fetch(`${BASE_URL}/workers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(worker),
    });

    if (!response.ok) {
      throw new Error('Failed to create worker');
    }

    const createdWorker = await response.json();
    console.log(`Worker created: ${JSON.stringify(createdWorker)}`);
  } catch (error) {
    console.error(error);
    return { message: 'Error creating worker' };
  }
  revalidatePath('/dashboard/workers');
  redirect('/dashboard/workers');
}
export async function updateWorker(
  id: number,
  oldWorker: Worker,
  prevState: WorkerState,
  formData: FormData,
) {
  const validatedFields = WorkerFormSchema.safeParse({
    name: formData.get('name'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to update worker.',
    };
  }

  const worker: Worker = {
    id: oldWorker.id,
    ...validatedFields.data,
  };

  try {
    const response = await fetch(`${BASE_URL}/workers/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(worker),
    });

    if (!response.ok) {
      throw new Error('Failed to update worker');
    }

    const updatedWorker = await response.json();
    console.log(`Worker updated: ${JSON.stringify(updatedWorker)}`);
  } catch (error) {
    console.error(error);
    return { message: 'Error updating worker' };
  }
  revalidatePath('/dashboard/workers');
  redirect('/dashboard/workers');
}
export async function deleteWorker(id: string) {
  try {
    const response = await fetch(`${BASE_URL}/workers/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete worker');
    }
    console.log(`Worker ${id} successfully deleted`);
    revalidatePath('/dashboard/workers');
  } catch (error) {
    console.error(error);
    return { message: 'Error deleting worker' };
  }
}
