package org.example.doctoratrestapi.auth.mail;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    public void sendActivationMail(String to, String activationLink) {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setFrom(fromEmail);
        msg.setTo(to);
        msg.setSubject("Activation de votre compte E-Doctorat");
        msg.setText(
                "Bonjour,\n\n" +
                        "Merci pour votre inscription.\n" +
                        "Veuillez activer votre compte via ce lien :\n" +
                        activationLink + "\n\n" +
                        "Si vous n’êtes pas à l’origine de cette demande, ignorez cet email.\n\n" +
                        "E-Doctorat USMBA"
        );

        mailSender.send(msg);
    }

    public void sendResetPasswordMail(String to, String link) {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setFrom(fromEmail);
        msg.setTo(to);
        msg.setSubject("Réinitialisation du mot de passe");
        msg.setText(
                "Bonjour,\n\n" +
                        "Cliquez sur ce lien pour réinitialiser votre mot de passe :\n" +
                        link + "\n\n" +
                        "Lien valable 30 minutes."
        );
        mailSender.send(msg);
    }

}
