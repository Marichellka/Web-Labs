using System.Threading.Tasks;
using WebAppLab2.Models;
using Microsoft.Extensions.Configuration;
using System.Net;
using System.Net.Mail;
using System;

namespace WebAppLab2.Services
{
    public class EmailService
    {
        private readonly string _email;
        private readonly string _password;

        public EmailService(IConfiguration configuration)
        {
            _email = configuration["EmailAddress"];
            _password = configuration["EmailPassword"];
        }

        public async Task<bool> TrySendAsync(EmailModel email)
        {
            bool isSuccessful = true;
            try
            {
                System.Net.Mail.SmtpClient client = new("smtp.gmail.com", 587)
                {
                    Credentials = new NetworkCredential(_email, _password),
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    EnableSsl = true
                };

                MailMessage mail = new()
                {
                    From = new MailAddress(_email, email.Name),
                    Body = email.Message,
                    To = { email.EmailAddress },
                    IsBodyHtml = true
                };

                await client.SendMailAsync(mail);
            }
            catch (Exception)
            {
                isSuccessful = false;
            }

            return isSuccessful;
        }
    }
}
