import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

const BigImagemodal = ({ item }: { item: any }) => {
  return (
    <Dialog>
      <DialogTitle className="hidden">s</DialogTitle>
      <DialogTrigger>
        <div className="h-[10rem] overflow-auto  flex items-center justify-center thin-scrollbar">
          <Image
            width={200}
            height={200}
            src={item?.image || item?.problemId?.image || "/noimage.png"}
            alt="Problem by students"
            className="h-48 w-full object-cover rounded-md cursor-pointer"
            layout="responsive"
            priority
          />
        </div>
        <div className="text-sm text-center mt-1 hover:underline text-slate-400">
          Tap to view full size{" "}
        </div>
      </DialogTrigger>
      <DialogHeader>
        <DialogDescription>
          <DialogContent
            aria-describedby="dialog-description"
            className="overflow-auto max-h-screen"
          >
            <Image
              width={500}
              height={500}
              className="rounded-md"
              src={item?.image || item?.problemId?.image || "/noimage.png"}
              alt="Answer slolution"
            />
          </DialogContent>
        </DialogDescription>
      </DialogHeader>
    </Dialog>
  );
};

export default BigImagemodal;
