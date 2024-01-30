package pbs.edu.rekrutacja.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import pbs.edu.rekrutacja.models.ERole;
import pbs.edu.rekrutacja.models.Role;
import pbs.edu.rekrutacja.models.User;
import pbs.edu.rekrutacja.repository.RoleRepository;
import pbs.edu.rekrutacja.repository.UserRepository;

import java.util.HashSet;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Set;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id_klienta) {
        return userRepository.findById(id_klienta)
                .orElseThrow(() -> new NoSuchElementException("User not found"));
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new NoSuchElementException("User not found with username: " + username));
    }

    public User createUser(User user) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);

//        Set<Role> roles = new HashSet<>();
//        roles.add(new Role(ERole.ROLE_USER));
//        roleRepository.saveAll(roles);

//        user.setRoles(roles);

        return userRepository.save(user);
    }


    public User updateUser(Long id_klienta, User newUser) {
        User existingUser = getUserById(id_klienta);

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String encodedPassword = passwordEncoder.encode(newUser.getPassword());
        existingUser.setPassword(encodedPassword);

        existingUser.setLastName(newUser.getLastName().trim());
        existingUser.setFirstName(newUser.getFirstName().trim());

        try {
            userRepository.save(existingUser);
        } catch (DataAccessException e) {
            System.out.println("Error updating user: " + e.getMessage());
        }
        return existingUser;
    }

    public void deleteUser(Long id_klienta) {
        userRepository.deleteById(id_klienta);
    }
}

