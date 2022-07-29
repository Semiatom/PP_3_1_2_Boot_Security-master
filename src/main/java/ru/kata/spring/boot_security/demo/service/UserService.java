package ru.kata.spring.boot_security.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.repository.UserRepository;

import java.util.List;

public interface UserService {

    public List<User> getAllUsers();

    public User getUserById(Integer id);

    public void saveUser(User user);

    public void deleteUser(int id);

    public User findByUsername(String username);

}
