import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

const Avatarr = ({ session }: { session: any }) => {
  return (
    <Avatar>
      <AvatarImage src={session?.user?.image || "/public.png"} />
      <AvatarFallback>
        <Image width={80} height={80} src="/public.png" alt="" />
      </AvatarFallback>
    </Avatar>
  );
};

export default Avatarr;
