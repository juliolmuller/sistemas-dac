package com.lacussoft.sosifod.validation;

import com.lacussoft.utils.Converter;
import javax.faces.application.FacesMessage;
import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.validator.FacesValidator;
import javax.faces.validator.Validator;
import javax.faces.validator.ValidatorException;

@FacesValidator("email")
public class EmailValidator implements Validator {

    public final static String INVALID_MESSAGE = "Email inválido.";

    @Override
    public void validate(FacesContext context, UIComponent ui, Object value) throws ValidatorException {

        String email = Converter.nullable((String) value);

        if (email != null && !com.lacussoft.utils.Validator.isEmail(email)) {
            FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_ERROR, INVALID_MESSAGE, INVALID_MESSAGE);
            throw new ValidatorException(msg);
        }
    }
}
