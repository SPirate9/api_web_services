const RANDOMMER_API_KEY = "f994c83e6aae4fa3a79d7b4f4f121370";
const RM_HEADERS = { "X-Api-Key": RANDOMMER_API_KEY };

// Randomuser
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api/");
  const data = await res.json();
  const u = data?.results?.[0];
  return {
    name: `${u?.name?.first} ${u?.name?.last}`.trim(),
    email: u?.email,
    gender: u?.gender,
    location: `${u?.location?.city}, ${u?.location?.country}`,
    picture: u?.picture?.large,
  };
}

// Randommer: phone
async function getPhoneNumber() {
  const res = await fetch("https://randommer.io/api/Phone/Generate?CountryCode=fr&Quantity=1", { headers: RM_HEADERS });
  const data = await res.json();
  return data[0]; 
}

// Randommer: IBAN
async function getIban() {
  const res = await fetch("https://randommer.io/api/Finance/Iban/fr", { headers: RM_HEADERS });
  const text = await res.text();
  return text.trim();
}

// Randommer: credit card
async function getCreditCard() {
  const res = await fetch("https://randommer.io/api/Card", { headers: RM_HEADERS });
  const data = await res.json();
  const c = Array.isArray(data) ? data[0] : data;
  return {
    card_number: c?.number || c?.creditCardNumber,
    card_type: c?.type || c?.creditCardType,
    expiration_date: c?.expiration || c?.expirationDate,
    cvv: c?.cvv || c?.cvv2,
  };
}

// Randommer: name 
async function getRandomName() {
  const res = await fetch("https://randommer.io/api/Name?nameType=firstname&quantity=1", { headers: RM_HEADERS });
  const data = await res.json();
  return data[0]; 
}

// Extra APIs: quote and joke
async function getQuote() {
  const res = await fetch("https://zenquotes.io/api/random");
  const arr = await res.json();
  const q = Array.isArray(arr) ? arr[0] : arr;
  return { content: q?.q, author: q?.a };
}

async function getJoke() {
  const res = await fetch("https://official-joke-api.appspot.com/jokes/programming/random");
  const arr = await res.json();
  const j = Array.isArray(arr) ? arr[0] : arr;
  return { type: "Programming", content: [j?.setup, j?.punchline].filter(Boolean).join(" ") };
}

async function main() {
  const [user, phone_number, iban, credit_card, random_name, quote, joke] = await Promise.all([
    getRandomUser(),
    getPhoneNumber(),
    getIban(),
    getCreditCard(),
    getRandomName(),
    getQuote(),
    getJoke(),
  ]);

  console.log(JSON.stringify({ user, phone_number, iban, credit_card, random_name, quote, joke }, null, 2));
}

main().catch(console.error);
