import { getRandomUser, getPhoneNumber, getIban, getCreditCard, getRandomName, getQuote, getJoke } from '../../main.mjs';

const Aggregator = class Aggregator {
  constructor(app) {
    this.app = app;
    this.run();
  }

  run() {
    this.app.get('/aggregate', async (req, res) => {
      try {
        const [user, phone_number, iban, credit_card, random_name, quote, joke] = await Promise.all([
          getRandomUser(),
          getPhoneNumber(),
          getIban(),
          getCreditCard(),
          getRandomName(),
          getQuote(),
          getJoke(),
        ]);

        const darkData = {
          initials: user.name.split(" ").map(n => n[0]).join(""),
          card_valid: new Date(credit_card.expiration_date) > new Date(),
          email_domain: user.email.split("@")[1],
          formatted_phone: phone_number.replace(/(\d{2})(?=\d)/g, "$1 "),
        };

        res.status(200).json({ user, phone_number, iban, credit_card, random_name, quote, joke, darkData });
      } catch (err) {
        console.error(`[ERROR] /aggregate -> ${err}`);
        res.status(500).json({ code: 500, message: 'Internal Server Error' });
      }
    });
  }
};

export default Aggregator;
