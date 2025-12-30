import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const products = [
  {
    name: "Zen Harmony Bowl",
    slug: "zen-harmony-bowl",
    description:
      "A beautifully crafted 7-inch bowl made from a seven-metal alloy, perfect for deep meditation and achieving a state of tranquility. Its long-lasting resonance helps in focusing the mind.",
    price: 99.99,
    imageUrl:
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600&h=400&fit=crop",
    imageHint: "singing bowl meditation",
    audioUrl:
      "https://r2.fivemanage.com/s1eqtVnkFslLnri1MNmBV/singingbowl_sound1.mp3",
    tag: "singing-bowl",
  },
  {
    name: "Resonance Master Bowl",
    slug: "resonance-master-bowl",
    description:
      "A large 12-inch bowl with powerful, deep sound projection. Ideal for sound healing practitioners and group sessions. Its profound vibrations can be felt throughout the body.",
    price: 249.99,
    imageUrl:
      "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=600&h=400&fit=crop",
    imageHint: "large singing bowl",
    audioUrl:
      "https://r2.fivemanage.com/s1eqtVnkFslLnri1MNmBV/singingbowl_sound1.mp3",
    tag: "singing-bowl",
  },
  {
    name: "Serenity Now Bowl",
    slug: "serenity-now-bowl",
    description:
      "Compact and easy to transport, this 4-inch bowl brings instant calm wherever you go. Perfect for office stress relief or as a travel companion for mindfulness on the move.",
    price: 59.99,
    imageUrl:
      "https://images.unsplash.com/photo-1514516870000-8e8e6b500a30?w=600&h=400&fit=crop",
    imageHint: "small singing bowl",
    audioUrl:
      "https://r2.fivemanage.com/s1eqtVnkFslLnri1MNmBV/singingbowl_sound1.mp3",
    tag: "singing-bowl",
  },
  {
    name: "Tibetan Thunder Bowl",
    slug: "tibetan-thunder-bowl",
    description:
      "A traditional hand-hammered Tibetan bowl, 9 inches in diameter. It produces a deep, resonant hum with complex overtones, grounding you in the present moment.",
    price: 179.99,
    imageUrl:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop",
    imageHint: "tibetan bowl",
    audioUrl:
      "https://r2.fivemanage.com/s1eqtVnkFslLnri1MNmBV/singingbowl_sound1.mp3",
    tag: "singing-bowl",
  },
  {
    name: "Crystal Chakra Bowl",
    slug: "crystal-chakra-bowl",
    description:
      "A stunning 8-inch frosted quartz crystal bowl tuned to the frequency of the heart chakra (F note). Its pure, high-frequency tone is ideal for chakra alignment and energy work.",
    price: 199.99,
    imageUrl:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    imageHint: "crystal bowl",
    audioUrl:
      "https://r2.fivemanage.com/s1eqtVnkFslLnri1MNmBV/singingbowl_sound1.mp3",
    tag: "singing-bowl",
  },
  {
    name: "Himalayan Heart Bowl",
    slug: "himalayan-heart-bowl",
    description:
      "Hand-hammered by artisans in the Himalayan foothills, this 6-inch bowl has a uniquely warm and inviting tone. It is perfect for loving-kindness meditation and cultivating compassion.",
    price: 129.99,
    imageUrl:
      "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=600&h=400&fit=crop",
    imageHint: "himalayan bowl",
    audioUrl:
      "https://r2.fivemanage.com/s1eqtVnkFslLnri1MNmBV/singingbowl_sound1.mp3",
    tag: "singing-bowl",
  },
];

async function main() {
  console.log("Start seeding...");

  for (const product of products) {
    const result = await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
    console.log(`Created product: ${result.name}`);
  }

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
