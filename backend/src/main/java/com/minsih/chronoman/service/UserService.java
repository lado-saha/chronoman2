package com.minsih.chronoman.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.minsih.chronoman.model.User;
import com.minsih.chronoman.repository.UserRepository;

@Service
public class UserService {

  @Autowired
  private UserRepository userRepository;

  public User findById(String id) {
    return userRepository.findById(id).orElse(null);
  }

  public List<User> findAll() {
    return userRepository.findAll();
  }

  public User save(User user) {
    return userRepository.save(user);
  }

  public void deleteById(String id) {
    userRepository.deleteById(id);
  }

  public User findByEmail(String email) {
    return userRepository.findByEmail(email);
  }
}
