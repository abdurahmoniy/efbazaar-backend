import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createOrUpdateUser(req, res) {
  try {
    const firebaseUser = req.user; // decoded token
    const { displayName, photoURL, phoneNumber } = req.body;

    let user = await prisma.user.findUnique({
      where: { id: firebaseUser.uid },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          id: firebaseUser.uid,
          email: firebaseUser.email,
          provider: firebaseUser.firebase.sign_in_provider,
          displayName,
          photoURL,
          phoneNumber,
          lastLogin: new Date(),
        },
      });
    } else {
      user = await prisma.user.update({
        where: { id: firebaseUser.uid },
        data: {
          displayName: displayName ?? user.displayName,
          photoURL: photoURL ?? user.photoURL,
          phoneNumber: phoneNumber ?? user.phoneNumber,
          lastLogin: new Date(),
        },
      });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
