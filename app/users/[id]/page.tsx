import UserForm from '@/components/UserForm';
import prisma from '@/prisma/db';

type EditUserProps = {
  params: { id: string };
};

async function EditUser({ params }: EditUserProps) {
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!user) return <p className="text-destructive">User Not Found</p>;

  user.password = '';
  return <UserForm user={user} />;
}

export default EditUser;
