import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      var { title, description, price, guests, beds, baths } = req.body;
      price = parseInt(price);
      guests = parseInt(price);
      beds = parseInt(beds);
      baths = parseInt(baths);
      const home = await prisma.home.create({
        data: {
          title,
          description,
          price,
          guests,
          beds,
          baths,
        },
      });
      res.redirect("/");
    } catch (e) {
      res.status(500).json({ message: "Something went wrong" });
      console.log(e);
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
}
