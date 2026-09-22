import { prisma } from '@/lib/prisma';
import BlogForm from '../BlogForm';

export default async function BlogPostFormPage({ params }: { params: { id: string } }) {
  const isNew = params.id === 'new';
  let post = null;

  if (!isNew) {
    post = await prisma.blogPost.findUnique({ where: { id: params.id } });
  }

  return <BlogForm post={post} isNew={isNew} />;
}