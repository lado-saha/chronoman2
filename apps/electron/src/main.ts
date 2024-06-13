import { app, BrowserWindow } from "electron";
import { getPort } from "get-port-please";
import { startServer } from "next/dist/server/lib/start-server";
import * as path from "path";
import { spawn, ChildProcessWithoutNullStreams } from "child_process";

let win: BrowserWindow;
let springBootProcess: ChildProcessWithoutNullStreams;

app.on("ready", async () => {
  win = new BrowserWindow({ width: 800, height: 600 });
  const nextJSPort = 3000;
  let url = `http://localhost:${nextJSPort}/`;

  const basePath = path.dirname(path.dirname(app.getAppPath()));

  // Define paths based on the operating system
  // const javaExecPath = `${basePath}/web/public/chrono_jre/bin/java`;
  // // const jarPath = `${basePath}/web/public/chrono_jre/Chronoman-0.0.1.jar`;

  // springBootProcess = spawn(javaExecPath, ["-jar", jarPath]);

  // springBootProcess.stdout.on("data", (data) => {
  //   console.log(`Spring Boot Spwaned ${data}`);
  // });

  // springBootProcess.on("close", (code) => {
  //   console.log(`Spring Boot process exited with code ${code}`);
  // });

  if (process.env.NODE_ENV !== "development") {
    const nextJSPort = await getPort({ portRange: [30_011, 50_000] });
    const webDir = `${basePath}/web`;

    try {
      await startServer({
        dir: webDir,
        isDev: false,
        hostname: "localhost",
        port: nextJSPort,
        customServer: true,
        allowRetry: false,
      });
      url = `http://localhost:${nextJSPort}/`;
    } catch (err) {
      console.error("Failed to start Next.js server:", err);
      console.error(err);
      process.exit(1);
    }
  }

  win.loadURL(url);
  win.show();
  win.webContents.openDevTools();
});

// Quit the app once all windows are closed
app.on("window-all-closed", () => {
  if (springBootProcess) {
    springBootProcess.kill("SIGINT"); // Ensure Spring Boot process is stopped
  }
  app.quit();
});
