package pbs.edu.rekrutacja.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pbs.edu.rekrutacja.models.ERole;
import pbs.edu.rekrutacja.models.Role;
import pbs.edu.rekrutacja.models.User;
import pbs.edu.rekrutacja.repository.RoleRepository;
import pbs.edu.rekrutacja.repository.UserRepository;
import pbs.edu.rekrutacja.services.UserService;

import java.util.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;

    public UserController(RoleRepository roleRepository, UserRepository userRepository) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id_klienta}")
    public User getUserById(@PathVariable Long id_klienta) {
        return userService.getUserById(id_klienta);
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        Set<Role> roles = new HashSet<>();
        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(userRole);
        user.setRoles(roles);
        return userService.createUser(user);
    }

    @PutMapping("/{id_klienta}")
    public User updateUser(@PathVariable Long id_klienta, @RequestBody User newUser) {
        User existingUser = userService.getUserById(id_klienta);
        existingUser.setUsername(newUser.getUsername());
        existingUser.setEmail(newUser.getEmail());
        existingUser.setFirstName(newUser.getFirstName());
        existingUser.setLastName(newUser.getLastName());
        Set<Role> roles = new HashSet<>();
        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(userRole);
        existingUser.setRoles(roles);
        return userService.updateUser(id_klienta, existingUser);
    }


    @DeleteMapping("/{id_klienta}")
    public void deleteUser(@PathVariable Long id_klienta) {
        userService.deleteUser(id_klienta);
    }

}
