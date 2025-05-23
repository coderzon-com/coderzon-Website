export const schema = {
  types: [
    {
      name: 'blogs',
      title: 'Blogs',
      type: 'document',
      fields: [
        {
          name: 'blogName',
          title: 'Blog Name',
          type: 'string',
          validation: Rule => Rule.required()
        },
        {
          name: 'slug',
          title: 'Slug',
          type: 'slug',
          options: {
            source: 'blogName',
            maxLength: 96,
            slugify: input =>
              input
                .toLowerCase()
                .replace(/\s+/g, '-')
                .slice(0, 96),
            isUnique: (slug, context) => {
              if (!slug?.current) return true; // Prevent query if slug is undefined
              const { document, getClient } = context;
              const client = getClient({ apiVersion: '2023-01-01' });

              return client.fetch(
                `!defined(*[_type == "blogs" && slug.current == $slug && _id != $id][0]._id)`,
                { slug: slug.current, id: document._id }
              );
            }
          },
          validation: Rule => Rule.required().error('Slug is required and must be unique')
        },
        {
          name: 'image',
          title: 'Image',
          type: 'image',
          options: { hotspot: true },
          validation: Rule => Rule.required()
        },
        {
          name: 'content',
          title: 'Content',
          type: 'array',
          of: [{ type: 'block' }],
          validation: Rule =>
            Rule.required().min(1).error('Content must not be empty')
        },
        {
          name: 'createdAt',
          title: 'Created At',
          type: 'datetime',
          readOnly: ({ document }) => !!document?.createdAt, // Make read-only if already set
          validation: Rule =>
            Rule.required().error('Created At will be set automatically when published')
        }
      ]
    }
  ]
}
