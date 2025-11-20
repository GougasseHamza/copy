package com.pharmfinder.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class MedicineDTO {
    private Integer id;
    private String name;
    private Double price;
    private String usage;
    private String dosage;
    private String form;
    
    @JsonProperty("searchName")
    private String searchName;
}
