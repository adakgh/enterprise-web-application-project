package com.example.demo.services;

import com.example.demo.models.FactuurMail;
import com.example.demo.persistence.entities.UserEntity;
import lombok.AllArgsConstructor;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
@AllArgsConstructor
public class MailService {

    private static final String FROM_ADDRESS = "vanstreek2@gmail.com";
    private static final String SUBJECT = "Factuur Aanvraag Vanstreek Product";
    private final JavaMailSender javaMailSender;

    /**
     * Sends email to user with a link to verify the e-mailaddress.
     */
    public void sendFactuurEmail(FactuurMail factuurMail) throws MailException, MessagingException {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();

        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

        helper.setFrom(factuurMail.getSenderMail());
        helper.setTo(factuurMail.getReceiverEmail());
        helper.setSubject(SUBJECT);
        helper.setText("<html lang=\"en\"><body style=\"background-color: #fafbfc; padding-top:40px; " +
                        "font-family:'Open+Sans', 'Open Sans', Helvetica, Arial, sans-serif;\"><table border=\"0\" " +
                        "cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n <tbody><tr><td><div style=\"width:100%;" +
                        "background-color:#fafbfc;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;\">" +
                        "<div id=\"maincontent\" style=\"max-width:620px; font-size:0;margin:0 auto;\">\n" +
                        "<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"width:100%;\">" +
                        "<tbody><tr><td><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"width:100%;\">\n" +
                        "<tbody><tr><td align=\"center\" style=\"padding-bottom:20px;\">\n <table border=\"0\" " +
                        "cellpadding=\"0\" cellspacing=\"0\" style=\"font-size:13px; line-height:18px; color:#255239; " +
                        "text-align:center; width:152px;\">\n <tbody><tr><td style=\"padding:20px 0 10px 0;\">" +
                        "<a href=\"#tba\" style=\"text-decoration:none;\" target=\"_blank\">" +
                        "<img border=\"0\" height=\"50\"\n " +
                        "src=\"https://cdn.shopify.com/s/files/1/0021/1966/3675/files/Van-streek-logo-liggend-zwart_482x.png\"\n" +
                        "style=\"display:block; width:152px !important; font-size:22px; line-height:26px; " +
                        "color:#000000; text-transform:uppercase; text-align:center; letter-spacing:1px;\"\n width=\"152\">" +
                        "</a></td></tr></tbody></table></td></tr></tbody></table></td></tr>\n <tr><td><table border=\"0\" " +
                        "cellpadding=\"0\" cellspacing=\"0\" style=\"width:100%;\"><tbody><tr>\n <td><table border=\"0\" " +
                        "cellpadding=\"0\" cellspacing=\"0\" style=\"width:100%;\"><tbody>\n <tr><td style=\"text-align:center;" +
                        "padding:40px 40px 40px 40px; border-top:3px solid #255239; background-color: white;\">\n" +
                        "<div style=\"display:inline-block; width:100%; max-width:520px;\">\n" +
                        "<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\"\n" +
                        "style=\"font-size:14px; line-height:24px; color:#525C65; text-align:left; width:100%;\">\n" +
                        "<tbody>\n" +
                        "<tr><td><p style=\"text-align:center;margin:0; font-size:18px; line-height:23px; color:#102231; font-weight:bold;\">\n" +
                        "       <strong>" + SUBJECT + " van " +factuurMail.getSenderMail() +" ,</strong><br><br></p></td></tr>\n <tr><td>\n" +
                        "       Aaanvraag voor: \n"+ factuurMail.getProductName() + "<br>\n" +
                        "       Hoeveelheid: \n"+ factuurMail.getQuantity() +" " +factuurMail.getUnit()+"<br>\n" +
                        "       Kosten: \n"+ factuurMail.getPricePerUnit() + " - Totaal: "+factuurMail.getTotalPrice()+"<br>\n" +
                        "       <br> Als u akoord gaat, stuur aub een factuur naar de volgende emailadres: <br>\n" +
                        "        "+factuurMail.getSenderMail()+"<br>\n" +
                        "</td></tr>\n <tr><td align=\"center\" style=\"padding:15px 0 40px 0; border-bottom:1px solid #f3f6f9;\">\n" +
                        "</body>\n</html>",
                true);
        javaMailSender.send(mimeMessage);
    }


}
