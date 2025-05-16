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
          name: 'image',
          title: 'Image',
          type: 'image',
          options:{hotspot:true},
          validation: Rule => Rule.required()
        },
        {
          name: 'content',
          title: 'Content',
          type: 'array',
          of: [{ type: 'block' }],
          validation: Rule => Rule.required().min(1).error('Content must not be empty')
        },
     {
  name: 'createdAt',
  title: 'Created At',
  type: 'datetime',
  readOnly: ({document}) => !!document?.createdAt, // Make read-only if already set
  validation: Rule =>
    Rule.required().error('Created At will be set automatically when published'),
}

      ]
    }
  ]
}
