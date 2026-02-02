package org.example.doctoratrestapi.dtos.common;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SelectOptionDto {
    private Long id;
    private String label;
}