const generateEmailOption = ({ to, subject, template }) => {
  return {
    from: '"Golam rabbi" <workout55@gmail.com>',
    to,
    subject,
    html: template
  };
};

module.exports = generateEmailOption;
