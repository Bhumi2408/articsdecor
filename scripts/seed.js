import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Category from "../models/Category.js";
import Product from "../models/Product.js";
import BlogPost from "../models/BlogPost.js";
import Admin from "../models/Admin.js";

function img(text) {
  return `https://placehold.co/800x800/f3e9d2/a9812f.png?text=${encodeURIComponent(text)}`;
}

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("Missing MONGODB_URI environment variable");

  await mongoose.connect(uri);
  console.log("Connected to MongoDB");

  await Promise.all([
    Category.deleteMany({}),
    Product.deleteMany({}),
    BlogPost.deleteMany({}),
    Admin.deleteMany({}),
  ]);
  console.log("Cleared categories, products, blog posts and admins");

  const categories = await Category.insertMany([
    { name: "Wedding Rings", slug: "wedding-rings", description: "Handcrafted diamond and gemstone wedding rings, made to be treasured for a lifetime." },
    { name: "Pendants", slug: "pendants", description: "Elegant diamond and gemstone pendants for every occasion." },
    { name: "Earrings", slug: "earrings", description: "Timeless diamond and precious stone earrings." },
    { name: "Jewellery", slug: "jewellery", description: "Our full range of handcrafted, ethically sourced jewellery." },
  ]);

  const [weddingRings, pendants, earrings, jewellery] = categories;

  const products = [
    {
      name: "0.79ct Fancy C3 Champagne RB Diamond",
      slug: "0-79ct-fancy-c3-champagne-rb-diamond",
      price: 79999.99,
      category: weddingRings._id,
      images: [img("Champagne Diamond Ring")],
      description: "<p>A striking 0.79ct fancy champagne round brilliant diamond, set in 18k white gold with sparkling accent stones.</p>",
      specs: { centerStone: "0.79ct Fancy C3 Champagne Round Brilliant", accentStones: "26 x 0.015ct G SI+ Round Brilliant", metal: "18k White Gold", totalCarats: "1.18ct", totalWeight: "3.8 grams", size: "S", certificate: "EGLSA 220610580" },
      collectionTag: "The Iconic Collection",
      featured: true,
      ratingAvg: 4.6,
      ratingCount: 5,
    },
    {
      name: "2.207ct Vivid Violet Blue Cushion Tanzanite Ring",
      slug: "2-207ct-vivid-violet-blue-cushion-tanzanite-ring",
      price: 95999.99,
      category: weddingRings._id,
      images: [img("Tanzanite Ring")],
      description: "<p>A rare 2.207ct vivid violet-blue cushion cut tanzanite, framed by a halo of brilliant cut diamonds.</p>",
      specs: { centerStone: "2.207ct Vivid Violet Blue Cushion Tanzanite", accentStones: "18 x 0.02ct G VS Round Brilliant", metal: "18k White Gold", totalCarats: "2.57ct", totalWeight: "4.2 grams", size: "M", certificate: "EGLSA 220610581" },
      collectionTag: "Color In Your Look",
      featured: true,
      ratingAvg: 4.8,
      ratingCount: 4,
    },
    {
      name: "Cushion Diamond Ring",
      slug: "cushion-diamond-ring",
      price: 59999.99,
      category: weddingRings._id,
      images: [img("Cushion Diamond Ring")],
      description: "<p>A classic cushion cut diamond solitaire in a delicate pave band.</p>",
      specs: { centerStone: "1.02ct H VS2 Cushion Cut", metal: "18k White Gold", totalCarats: "1.22ct", totalWeight: "3.5 grams", size: "N", certificate: "EGLSA 220610582" },
      collectionTag: "The Iconic Collection",
      featured: true,
      ratingAvg: 4.8,
      ratingCount: 3,
    },
    {
      name: "Diamond Solitaire Ring",
      slug: "diamond-solitaire-ring",
      price: 65999.99,
      category: weddingRings._id,
      images: [img("Solitaire Ring")],
      description: "<p>The ultimate symbol of timeless love — a single brilliant cut diamond on a polished band.</p>",
      specs: { centerStone: "1.10ct G VS1 Round Brilliant", metal: "Platinum", totalCarats: "1.10ct", totalWeight: "4.0 grams", size: "O", certificate: "EGLSA 220610583" },
      featured: true,
    },
    {
      name: "Fancy Black Radiant Diamond Ring",
      slug: "fancy-black-radiant-diamond-ring",
      price: 48299.99,
      category: weddingRings._id,
      images: [img("Black Diamond Ring")],
      description: "<p>A bold radiant cut black diamond set among white diamond accents for striking contrast.</p>",
      specs: { centerStone: "1.05ct Fancy Black Radiant", accentStones: "20 x 0.01ct G SI Round Brilliant", metal: "18k White Gold", totalCarats: "1.25ct", totalWeight: "3.9 grams", size: "M", certificate: "EGLSA 220610584" },
      collectionTag: "Black Friday Offer",
    },
    {
      name: "Fancy Greenish-Brown Diamond Ring",
      slug: "fancy-greenish-brown-diamond-ring",
      price: 48415.99,
      category: weddingRings._id,
      images: [img("Greenish Brown Diamond Ring")],
      description: "<p>An earthy, one-of-a-kind fancy greenish-brown diamond in a modern split-shank setting.</p>",
      specs: { centerStone: "0.95ct Fancy Greenish-Brown Round Brilliant", metal: "18k Rose Gold", totalCarats: "0.95ct", totalWeight: "3.6 grams", size: "N", certificate: "EGLSA 220610585" },
    },
    {
      name: "Fancy Yellow Princess Diamond Ring",
      slug: "fancy-yellow-princess-diamond-ring",
      price: 39999.99,
      category: weddingRings._id,
      images: [img("Yellow Princess Ring")],
      description: "<p>A vivid fancy yellow princess cut diamond flanked by white diamond baguettes.</p>",
      specs: { centerStone: "0.85ct Fancy Yellow Princess Cut", accentStones: "2 x 0.10ct F VS Baguette", metal: "18k Yellow Gold", totalCarats: "1.05ct", totalWeight: "3.7 grams", size: "L", certificate: "EGLSA 220610586" },
      collectionTag: "Color In Your Look",
    },
    {
      name: "Intense Fancy Yellow Diamond Ring",
      slug: "intense-fancy-yellow-diamond-ring",
      price: 79899.99,
      category: weddingRings._id,
      images: [img("Intense Yellow Diamond Ring")],
      description: "<p>An intensely saturated fancy yellow diamond set in a bright yellow gold halo.</p>",
      specs: { centerStone: "1.15ct Fancy Intense Yellow Round Brilliant", metal: "18k Yellow Gold", totalCarats: "1.40ct", totalWeight: "4.1 grams", size: "O", certificate: "EGLSA 220610587" },
      collectionTag: "The Iconic Collection",
      featured: true,
    },
    {
      name: "Pear Shaped Tanzanite Ring",
      slug: "pear-shaped-tanzanite-ring",
      price: 19549.99,
      category: weddingRings._id,
      images: [img("Pear Tanzanite Ring")],
      description: "<p>A graceful pear shaped tanzanite set on a slender polished band.</p>",
      specs: { centerStone: "1.20ct Pear Shaped Tanzanite", metal: "Sterling Silver", totalCarats: "1.20ct", totalWeight: "2.8 grams", size: "M", certificate: "EGLSA 220610588" },
    },
    {
      name: "Radiant Cut Diamond Ring",
      slug: "radiant-cut-diamond-ring",
      price: 85499.99,
      category: weddingRings._id,
      images: [img("Radiant Diamond Ring")],
      description: "<p>A brilliant radiant cut diamond with exceptional fire, in a classic four-prong setting.</p>",
      specs: { centerStone: "1.35ct F VS1 Radiant Cut", metal: "Platinum", totalCarats: "1.35ct", totalWeight: "4.3 grams", size: "P", certificate: "EGLSA 220610589" },
      collectionTag: "The Iconic Collection",
      featured: true,
    },
    {
      name: "Rose Gold Diamond Ring",
      slug: "rose-gold-diamond-ring",
      price: 26999.99,
      category: weddingRings._id,
      images: [img("Rose Gold Ring")],
      description: "<p>A romantic rose gold band with a trio of brilliant cut diamonds.</p>",
      specs: { centerStone: "3 x 0.15ct G VS Round Brilliant", metal: "18k Rose Gold", totalCarats: "0.45ct", totalWeight: "3.2 grams", size: "L", certificate: "EGLSA 220610590" },
      collectionTag: "Elegant And Everlasting",
    },
    {
      name: "Seven Diamond Ring",
      slug: "seven-diamond-ring",
      price: 22999.99,
      category: weddingRings._id,
      images: [img("Seven Diamond Ring")],
      description: "<p>Seven graduated round brilliant diamonds set in a gentle curve.</p>",
      specs: { centerStone: "7 x 0.08ct G SI Round Brilliant", metal: "18k White Gold", totalCarats: "0.56ct", totalWeight: "2.9 grams", size: "M", certificate: "EGLSA 220610591" },
    },
    {
      name: "Seven Diamond Ring II",
      slug: "seven-diamond-ring-ii",
      price: 19549.99,
      category: weddingRings._id,
      images: [img("Seven Diamond Ring II")],
      description: "<p>A petite version of our signature seven diamond band.</p>",
      specs: { centerStone: "7 x 0.05ct G SI Round Brilliant", metal: "9ct White Gold", totalCarats: "0.35ct", totalWeight: "2.2 grams", size: "K", certificate: "EGLSA 220610592" },
    },
    {
      name: "Tanzanite & Diamond Ring",
      slug: "tanzanite-and-diamond-ring",
      price: 39999.99,
      category: weddingRings._id,
      images: [img("Tanzanite Diamond Ring")],
      description: "<p>A vivid oval tanzanite framed by a double halo of white diamonds.</p>",
      specs: { centerStone: "0.90ct Oval Tanzanite", accentStones: "24 x 0.01ct G SI Round Brilliant", metal: "18k White Gold", totalCarats: "1.14ct", totalWeight: "3.6 grams", size: "M", certificate: "EGLSA 220610593" },
      collectionTag: "Color In Your Look",
    },
    {
      name: "Three Diamond Ring",
      slug: "three-diamond-ring",
      price: 19999.99,
      category: weddingRings._id,
      images: [img("Three Diamond Ring")],
      description: "<p>Past, present and future — three brilliant cut diamonds on a simple band.</p>",
      specs: { centerStone: "3 x 0.12ct G SI Round Brilliant", metal: "9ct Yellow Gold", totalCarats: "0.36ct", totalWeight: "2.5 grams", size: "L", certificate: "EGLSA 220610594" },
    },
    {
      name: "Wedding Band",
      slug: "wedding-band",
      price: 2599.99,
      category: weddingRings._id,
      images: [img("Wedding Band")],
      description: "<p>A clean, comfort-fit polished wedding band for everyday wear.</p>",
      specs: { metal: "9ct Yellow Gold", totalWeight: "3.0 grams", size: "L", certificate: "N/A" },
    },
    {
      name: "Classic Eternity Ring Set",
      slug: "classic-eternity-ring-sets",
      price: 44999.99,
      category: weddingRings._id,
      images: [img("Eternity Ring Set")],
      description: "<p>A matching solitaire and eternity band set, designed to be worn together for a lifetime.</p>",
      specs: { centerStone: "0.80ct G VS Round Brilliant", accentStones: "16 x 0.03ct G VS Round Brilliant", metal: "18k White Gold", totalCarats: "1.28ct", totalWeight: "5.1 grams", size: "M", certificate: "EGLSA 220610595" },
      collectionTag: "Elegant And Everlasting",
      featured: true,
    },
    {
      name: "9ct White Gold Stud Earrings",
      slug: "9ct-white-gold-stud-earrings",
      price: 4599.99,
      category: earrings._id,
      images: [img("White Gold Earrings")],
      description: "<p>Classic brilliant cut diamond studs in polished 9ct white gold, perfect for everyday elegance.</p>",
      specs: { centerStone: "2 x 0.10ct G SI Round Brilliant", metal: "9ct White Gold", totalCarats: "0.20ct", totalWeight: "1.4 grams", certificate: "EGLSA 220610596" },
    },
    {
      name: "Diamond Drop Earrings",
      slug: "diamond-drop-earrings",
      price: 15999.99,
      category: earrings._id,
      images: [img("Diamond Drop Earrings")],
      description: "<p>Elegant drop earrings featuring brilliant cut diamonds suspended from a delicate white gold hook.</p>",
      specs: { centerStone: "2 x 0.18ct G VS Round Brilliant", metal: "18k White Gold", totalCarats: "0.36ct", totalWeight: "2.1 grams", certificate: "EGLSA 220610597" },
      featured: true,
    },
    {
      name: "Tanzanite Halo Earrings",
      slug: "tanzanite-halo-earrings",
      price: 22999.99,
      category: earrings._id,
      images: [img("Tanzanite Halo Earrings")],
      description: "<p>Round tanzanite centre stones surrounded by a halo of pave set diamonds.</p>",
      specs: { centerStone: "2 x 0.35ct Round Tanzanite", accentStones: "24 x 0.01ct G SI Round Brilliant", metal: "18k White Gold", totalCarats: "0.94ct", totalWeight: "2.8 grams", certificate: "EGLSA 220610598" },
      collectionTag: "Color In Your Look",
    },
    {
      name: "Oval Tanzanite Pendant",
      slug: "oval-tanzanite-pendant",
      price: 19999.99,
      category: pendants._id,
      images: [img("Tanzanite Pendant")],
      description: "<p>A vivid oval tanzanite pendant on an 18k white gold chain, accented with a diamond bail.</p>",
      specs: { centerStone: "1.10ct Oval Tanzanite", accentStones: "6 x 0.02ct G SI Round Brilliant", metal: "18k White Gold", totalCarats: "1.22ct", totalWeight: "2.4 grams", certificate: "EGLSA 220610599" },
      collectionTag: "Color In Your Look",
      featured: true,
    },
    {
      name: "Diamond Solitaire Pendant",
      slug: "diamond-solitaire-pendant",
      price: 12999.99,
      category: pendants._id,
      images: [img("Solitaire Pendant")],
      description: "<p>A single brilliant cut diamond suspended on a fine 18k white gold chain.</p>",
      specs: { centerStone: "0.25ct G VS Round Brilliant", metal: "18k White Gold", totalCarats: "0.25ct", totalWeight: "1.6 grams", certificate: "EGLSA 220610600" },
    },
    {
      name: "Heart Diamond Pendant",
      slug: "heart-diamond-pendant",
      price: 17999.99,
      category: pendants._id,
      images: [img("Heart Diamond Pendant")],
      description: "<p>A romantic heart-shaped pendant set with pave diamonds, on an adjustable chain.</p>",
      specs: { accentStones: "32 x 0.01ct G SI Round Brilliant", metal: "18k Rose Gold", totalCarats: "0.32ct", totalWeight: "2.0 grams", certificate: "EGLSA 220610601" },
      collectionTag: "Elegant And Everlasting",
    },
  ];

  await Product.insertMany(products);
  console.log(`Seeded ${products.length} products across ${categories.length} categories`);

  await BlogPost.insertMany([
    {
      title: "How to Choose the Perfect Engagement Ring",
      slug: "how-to-choose-the-perfect-engagement-ring",
      excerpt: "From cut to carat, here's everything you need to know before you shop for a ring.",
      content: `
        <p>Choosing an engagement ring starts with understanding the 4 Cs: cut, colour, clarity and carat.</p>
        <h2>The 4 Cs, briefly</h2>
        <ul>
          <li><strong>Cut</strong> determines how brilliantly a diamond catches the light.</li>
          <li><strong>Colour</strong> is graded from colourless to faintly tinted.</li>
          <li><strong>Clarity</strong> measures internal and surface imperfections.</li>
          <li><strong>Carat</strong> is simply the stone's weight.</li>
        </ul>
        <p>Beyond the diamond itself, consider the metal, band style and your partner's everyday lifestyle. At Lute Diamonds, every ring is handcrafted to order, so you can also customise the setting to suit their taste.</p>
        <blockquote>A ring should tell a story you both choose together.</blockquote>
      `.trim(),
      coverImage: img("Engagement Ring Guide"),
      metaTitle: "How to Choose the Perfect Engagement Ring | Lute Diamonds",
      metaDescription: "A practical guide to the 4 Cs and choosing a handcrafted engagement ring that fits your partner's style and lifestyle.",
      keywords: ["engagement ring guide", "diamond 4 cs", "how to buy an engagement ring", "South Africa diamonds"],
    },
    {
      title: "The Rise of Ethically Sourced Gemstones",
      slug: "the-rise-of-ethically-sourced-gemstones",
      excerpt: "Why more South African jewellers are committing to fully traceable stones.",
      content: `
        <p>Ethical sourcing means knowing exactly where a stone comes from and how it was mined.</p>
        <p>From Kimberley's rich diamond heritage to responsibly sourced tanzanite, Lute Diamonds only works with suppliers who meet strict ethical standards.</p>
        <h2>Why it matters</h2>
        <p>Traceability protects mining communities and gives customers confidence that their purchase didn't come at someone else's expense.</p>
      `.trim(),
      coverImage: img("Ethical Sourcing"),
      metaTitle: "Ethically Sourced Gemstones | Lute Diamonds",
      metaDescription: "Why traceable, ethically sourced diamonds and gemstones matter, and how Lute Diamonds vets every supplier.",
      keywords: ["ethical diamonds", "ethically sourced gemstones", "conflict free diamonds", "Kimberley diamonds"],
    },
    {
      title: "Caring for Your Fine Jewellery",
      slug: "caring-for-your-fine-jewellery",
      excerpt: "Simple habits that keep your diamonds and gemstones sparkling for a lifetime.",
      content: `
        <p>Clean your jewellery regularly with warm water and mild soap, store pieces separately to avoid scratching, and have prongs checked annually.</p>
        <ol>
          <li>Soak in warm water with a drop of mild soap.</li>
          <li>Brush gently with a soft toothbrush.</li>
          <li>Rinse and dry with a lint-free cloth.</li>
          <li>Store each piece separately in a soft pouch.</li>
        </ol>
        <p>With the right care, a handcrafted piece from Lute Diamonds will last for generations.</p>
      `.trim(),
      coverImage: img("Jewellery Care"),
      metaTitle: "Caring for Your Fine Jewellery | Lute Diamonds",
      metaDescription: "Simple, proven habits for cleaning and storing diamond jewellery so it keeps sparkling for a lifetime.",
      keywords: ["jewellery care", "how to clean diamond rings", "jewellery maintenance"],
    },
  ]);
  console.log("Seeded 3 blog posts");

  const adminEmail = process.env.ADMIN_SEED_EMAIL || "admin@lutediamonds.com";
  const adminPassword = process.env.ADMIN_SEED_PASSWORD || "Admin@12345";
  const passwordHash = await bcrypt.hash(adminPassword, 10);
  await Admin.create({ name: "Lute Diamonds Admin", email: adminEmail, passwordHash });
  console.log(`Seeded admin user: ${adminEmail} / ${adminPassword}`);

  await mongoose.disconnect();
  console.log("Done.");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
