using System;
using System.Diagnostics.CodeAnalysis;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using WebAppLab2.Models;

namespace WebAppLab2.Services
{
    public class EmailService
    {
        private readonly string email;

        private readonly string password;

        private readonly string client;

        public EmailService(IConfiguration configuration)
        {
            this.email = configuration["EmailAddress"];
            this.password = configuration["EmailPassword"];
            this.client = configuration["Client"];
        }

        public async Task<bool> TrySendAsync(EmailModel email)
        {
            bool isSuccessful = true;
            try
            {
                System.Net.Mail.SmtpClient client = new (this.client, 587)
                {
                    Credentials = new NetworkCredential(this.email, this.password),
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    EnableSsl = true,
                };

                MailMessage mail = new ()
                {
                    From = new MailAddress(this.email, email.Name),
                    Body = email.Message,
                    To = { email.EmailAddress },
                    IsBodyHtml = true,
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
