using System;
using WebAppLab2.Models;
using WebAppLab2.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Net.Mail;

namespace WebAppLab2.Controllers
{
    [Route("email")]
    [ApiController]
    public class MailController : Controller
    {
        private readonly EmailService _emailService;

        public MailController(EmailService service) => _emailService = service;

        [HttpPost]
        public async Task<ActionResult> SendMailAsync([FromBody] EmailModel mail)
        {
            EmailModel newMail = new EmailModel
            {
                EmailAddress = mail.EmailAddress,
                Name = mail.Name,
                Message = mail.Message
            };

            MailAddress address = new MailAddress(mail.EmailAddress);

            if(!await _emailService.TrySendAsync(mail))
            {
                return StatusCode(500);
            }

            return Ok(newMail);
        }
    }
}
