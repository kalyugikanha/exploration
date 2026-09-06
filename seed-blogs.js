const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const count = await prisma.blogPost.count();
  if (count < 4) {
      await prisma.blogPost.createMany({
        data: [
          {
            title: "Imperdiet sed sit dapibus netus sit augue tristique nunc elementum.",
            slug: "imperdiet-sed-sit-dapibus",
            introText: "Fames libero pellentesque bibendum lectus et urna sit feugiat consequat. Sit enim neque vitae volutpat nunc mollis tellus. Lacus tristique non amet ut. Velit habitant pulvinar suspendisse nec et massa.",
            featuredImage: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format&fit=crop",
            coverImageUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format&fit=crop",
            category: "Travel Tips",
            author: "Emily Johnson",
            isPublished: true,
            publishedAt: new Date()
          },
          {
            title: "10 Tips for Capturing Stunning Landscape Photography",
            slug: "10-tips-for-capturing-stunning-landscape",
            introText: "Landscape photography is one of the most popular genres among photographers. Learn how to capture breathtaking scenery with these essential tips.",
            featuredImage: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=600&auto=format&fit=crop",
            coverImageUrl: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=600&auto=format&fit=crop",
            category: "Photography",
            author: "Christopher Mitchell",
            isPublished: true,
            publishedAt: new Date(Date.now() - 86400000)
          },
          {
            title: "How Technology is Changing the Field of Travel Photography",
            slug: "how-technology-is-changing-the-field",
            introText: "Macro photography is a fascinating genre that allows you to capture the intricate details of the world around us. Discover the latest tech shaping the future.",
            featuredImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop",
            coverImageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop",
            category: "Technology",
            author: "Daniel Harrison",
            isPublished: true,
            publishedAt: new Date(Date.now() - 172800000)
          },
          {
            title: "Preserving History: The Importance of Architecture",
            slug: "preserving-history-the-importance",
            introText: "Preserving historic buildings and sites is an important consideration in the field of architecture. Dive into the world's most beautifully preserved monuments.",
            featuredImage: "https://images.unsplash.com/photo-1518398046578-8cca57782e17?q=80&w=600&auto=format&fit=crop",
            coverImageUrl: "https://images.unsplash.com/photo-1518398046578-8cca57782e17?q=80&w=600&auto=format&fit=crop",
            category: "Architecture",
            author: "Olivia Carter",
            isPublished: true,
            publishedAt: new Date(Date.now() - 259200000)
          }
        ]
      });
      console.log("Seeded 4 blog posts!");
  } else {
      console.log("Blog posts already seeded.");
  }
}

main().finally(() => prisma.$disconnect());