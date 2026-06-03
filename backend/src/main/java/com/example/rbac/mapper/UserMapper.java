package com.example.rbac.mapper;

import com.example.rbac.dto.UserDto;
import com.example.rbac.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);
    
    UserDto toDto(User user);
    
    @Mapping(target = "password", ignore = true)
    User toEntity(UserDto userDto);
}
