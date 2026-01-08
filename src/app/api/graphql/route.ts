import { readFileSync } from "fs";
import { join } from "path";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { Resolvers } from "../../../../apollo/__generated__/server/resolvers-types";

const typeDefs = readFileSync(
  join(process.cwd(), "apollo/documents/schema.gql"),
  "utf-8"
);

import { PrismaClient } from "@/generated/prisma";
// import { createLocalRequestContext } from "next/dist/server/after/builtin-request-context";
// import { I18NProvider } from "next/dist/server/lib/i18n-provider";
// import { startStandaloneServer } from "@apollo/server/standalone";

const prisma = new PrismaClient();

//  const main = async () => {
// //   const newLink = await prisma.link.create({
// //     data: {
// //       description: "test",
// //       url: "test",
// //     },
// //   });
//   const allLinks = await prisma.link.findMany();
//   console.log(allLinks);
// };

// main()
//   .catch((e) => {
//     throw e;
//   })
//   .finally(async () => {
//     prisma.$disconnect();
//   });

const resolvers: Resolvers = {
  Query: {
    info: () => "HackerNewsクローン",
    feed: async (parent, args, context) => {
      return context.prisma.link.findMany();
    },
  },
  Mutation: {
    post: (parent, args, context) => {
      const newLink = context.prisma.link.create({
        data: {
          url: args.url,
          description: args.description,
        },
      });
      return newLink;
      // const idCount = String(links.length);
      // const link = {
      //   id: idCount,
      //   description: args.description,
      //   url: args.url,
      // };
      // links.push(link);
      // return link;
    },
  },
};

const apolloServer = new ApolloServer<Resolvers>({ typeDefs, resolvers });

const handler = startServerAndCreateNextHandler(apolloServer, {
  context: async () => ({
    prisma,
  }),
});

export { handler as GET, handler as POST };
