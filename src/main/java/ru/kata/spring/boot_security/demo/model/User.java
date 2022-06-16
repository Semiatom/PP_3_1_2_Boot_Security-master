package ru.kata.spring.boot_security.demo.model;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.Size;

@Data
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "name")
    @Size(min = 1, max = 50, message = "Invalid length")
    private String name;


    @Size(min = 1, max = 50, message = "Invalid length")
    @Column(name = "surname")
    private String surname;

    @Column(name = "age")
    private int age;
}

