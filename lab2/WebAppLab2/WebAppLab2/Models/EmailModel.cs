using System.ComponentModel.DataAnnotations;

namespace WebAppLab2.Models
{
    public class EmailModel
    {
        [EmailAddress(ErrorMessage = "Email address is incorrect!")]
        [Required(ErrorMessage = "Email field is empty.")]
        public string EmailAddress { get; set; }

        [Required(ErrorMessage = "Name field is empty.")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Message field is empty.")]
        public string Message { get; set; }
    }
}
