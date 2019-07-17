async function feed(parent, args, context, info) {
  const where = args.filter ? {
    OR: [
      { fullName_contains: args.filter },
      { party_contains: args.filter },
      { state_contains: args.filter },
    ],
  } : {}

  const links = await context.prisma.links({
      where,
      skip: args.skip,
      first: args.first
    })
    return links
  }}
  const count = await context.prisma
  .linksConnection({
    where,
  })
  .aggregate()
  .count()
return {
  links,
  count,
}
}
