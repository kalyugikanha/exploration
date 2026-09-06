const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const count = await prisma.testimonial.count();
  if (count < 5) {
      await prisma.testimonial.createMany({
        data: [
          {
            customerName: "Guy Hawkins",
            review: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.",
            rating: 5,
            isActive: true
          },
          {
            customerName: "Jacob Jones",
            review: "Exploration Tours made our honeymoon truly unforgettable. The attention to detail, the private transfers, and the exquisite resort selection were beyond our expectations.",
            rating: 5,
            isActive: true
          },
          {
            customerName: "Eleanor Pena",
            review: "I've traveled all over Europe, but the itinerary designed by this team was by far the most immersive and stress-free experience I've ever had. Truly a 5-star service.",
            rating: 5,
            isActive: true
          },
          {
            customerName: "Bessie Cooper",
            review: "From the moment we landed to the day we departed, everything was handled with absolute professionalism. Highly recommend them for bespoke luxury travel.",
            rating: 5,
            isActive: true
          },
          {
            customerName: "Ralph Edwards",
            review: "The wildlife safari in Kenya was breathtaking. The guides were knowledgeable and the lodges were incredibly luxurious despite being in the middle of nature.",
            rating: 5,
            isActive: true
          },
          {
            customerName: "Courtney Henry",
            review: "A fantastic experience! They listened to all our quirky requests and managed to craft a holiday that suited every single member of our family perfectly.",
            rating: 4,
            isActive: true
          }
        ]
      });
      console.log("Seeded 6 testimonials!");
  } else {
      console.log("Testimonials already exist, ready to scroll.");
  }
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });