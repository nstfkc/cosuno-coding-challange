const { writeFile } = require("node:fs/promises");
const { join } = require("node:path");
const { randomUUID } = require("node:crypto");
const { faker } = require("@faker-js/faker");

const NUMBER_OF_ITEMS = 50;

const specialties = [
  "Excavation",
  "Plumbing",
  "Electrical",
  "Exterior",
  "Wood",
  "Metal",
].map((name) => ({
  name,
  slug: name.toLocaleLowerCase(),
}));

function getRandomSpecialties() {
  const random = Math.ceil(Math.random() * 15);
  const count = random % 5 === 0 ? 3 : random % 3 === 0 ? 2 : 1;
  let data = [];
  for (let i = 0; i < count; i++) {
    data.push(specialties[Math.floor(Math.random() * specialties.length)]);
  }
  return Array.from(new Set(data));
}

(async function () {
  let companies = [];
  for (let i = 0; i <= NUMBER_OF_ITEMS; i++) {
    const id = randomUUID();
    companies.push({
      id,
      name: faker.company.companyName(),
      slogan: faker.company.catchPhrase(),
      logo: faker.image.cats(100, 100, true),
      specialties: getRandomSpecialties(),
    });
  }

  await writeFile(
    join(__dirname, "data.json"),
    JSON.stringify({
      companies,
      filters: [
        {
          title: "Specialty",
          slug: "specialty",
          items: specialties,
        },
      ],
    })
  );
})();
