package ru.kata.spring.boot_security.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.Collection;

@Data
@Entity
@Table(name = "users")
@JsonIgnoreProperties({"hibernateLazyInitializer"})
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "name")
//    @Size(min = 1, max = 50, message = "Invalid length")
    private String name;


//    @Size(min = 1, max = 50, message = "Invalid length")
    @Column(name = "surname")
    private String surname;

    @Column(name = "age")
    private int age;

//    @Size(min = 1, max = 100, message = "Invalid length")
    @Column(name = "username")
    private String username;

//    @Size(min = 1, max = 100, message = "Invalid length")
    @Column(name = "password")
    private String password;

    @ManyToMany
    @JoinTable(name = "users_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Collection<Role> roles;

}

