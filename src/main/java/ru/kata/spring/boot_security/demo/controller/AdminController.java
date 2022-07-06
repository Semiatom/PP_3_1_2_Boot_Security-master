package ru.kata.spring.boot_security.demo.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.configs.WebSecurityConfig;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.repository.RoleRepository;
import ru.kata.spring.boot_security.demo.service.UserDetailsServiceImpl;
import ru.kata.spring.boot_security.demo.service.UserService;

import javax.validation.Valid;
import java.security.Principal;

@Controller
@RequestMapping("/admin")
public class AdminController {

    private final UserService userService;
    private final RoleRepository roleRepository;

    @Autowired
    public AdminController(UserService userService, RoleRepository roleRepository) {
        this.userService = userService;
        this.roleRepository = roleRepository;
    }

    @GetMapping()
    public String listOfUsers(ModelMap model, Principal principal) {
        model.addAttribute("allUsers", userService.getAllUsers());
        model.addAttribute("currentUser", userService.findByUsername(principal.getName()));
        model.addAttribute("user", new User());
        model.addAttribute("allRoles", roleRepository.findAll());
        return "users_list";
    }

    @GetMapping(value = "/add")
    public String createUserForm(Model model) {
        model.addAttribute("user", new User());
        model.addAttribute("allRoles", roleRepository.findAll());
        return "user_create";
    }

    @PostMapping(value = "/add")
    public String addUser(@Valid User user, BindingResult bindingResult) {
        if (bindingResult.hasErrors()){
            return "user_create";
        }
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(12);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userService.saveUser(user);
        return "redirect:/admin";
    }

    @GetMapping("/edit/{id}")
    public String editUser(@PathVariable("id") int id, ModelMap model) {
        model.addAttribute("user", this.userService.getUserById(id));
        model.addAttribute("allRoles", roleRepository.findAll());
        return "user_edit";
    }

    @PostMapping(value = "/edit/{id}")
    public String UpdateUser(@PathVariable("id") int id, @ModelAttribute("user") @Valid User user, BindingResult bindingResult) {
        if (bindingResult.hasErrors()){
            return "user_create";
        }
        userService.saveUser(user);
        return "redirect:/admin";
    }

    @GetMapping("/delete/{id}")
    public String deleteUser(@PathVariable("id") int id) {
        userService.deleteUser(id);
        return "redirect:/admin";
    }



}
