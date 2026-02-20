package com.thanet.health_me.repositories;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.thanet.health_me.models.UserModel;


@Repository
public class UserRepository {

    private List<UserModel> users = new ArrayList<>(
        List.of(
            new UserModel("1","Alice","alice@example.com"),
            new UserModel("2","Bob","bob@example.com"),
            new UserModel("3","Charlie","charlie@example.com")
        )
    );
    
    public List<UserModel> getUsers() {
        return users;
    }

    public void addUser(UserModel user){
        users.add(user);
    }

    public void removeUser(UserModel user){
        users.remove(user);
    }
    
    public void editUser(UserModel user){
        for(int i = 0; i < users.size(); i++){
            if(users.get(i).getId().equals(user.getId())) {
                users.set(i,user);
                return;
            }
        }
    }
}
