package org.example.doctoratrestapi.models.enums;

public enum DecisionEnum {
    LA,        // liste d'attente
    LP,        // liste principale
    ABSENT,
    REJETE;

    public static boolean isValid(String value) {
        if (value == null) return false;
        try {
            DecisionEnum.valueOf(value);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
