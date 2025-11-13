import { useState } from "react";
import type { TAnnouncement } from "@/api/announcements/announcements.types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

type TProps = {
  announcement: TAnnouncement;
};

function AnnouncementCard({ announcement }: TProps) {
  const [expanded, setExpanded] = useState(false);

  const MAX_LENGTH = 120;
  const isLong = announcement.content.length > MAX_LENGTH;

  const displayText = expanded
    ? announcement.content
    : announcement.content.slice(0, MAX_LENGTH);

  return (
    <div
      key={announcement._id}
      className="flex flex-col lg:flex-row gap-4 items-start"
    >
      <div className="flex items-center gap-3 w-full md:w-2/6">
        <Avatar className="h-12 w-12">
          <AvatarImage src={announcement.avatarUrl} />
          <AvatarFallback className="bg-amber-100 text-gray-400">
            {announcement.authorName
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-foreground text-nowrap">
            {announcement.authorName}
          </p>
          <p className="text-xs text-muted-foreground">
            {announcement.authorTitle}
          </p>
        </div>
      </div>

      <div className="w-full md:w-4/6 flex flex-col text-sm text-muted-foreground leading-normal">
        <p>
          {displayText}
          {!expanded && isLong ? "..." : ""}
        </p>

        {isLong && (
          <Button
            variant="link"
            className="px-0 mt-1 h-auto text-xs"
            onClick={() => setExpanded((prev) => !prev)}
          >
            {expanded ? "Show Less" : "Show More"}
          </Button>
        )}
      </div>
    </div>
  );
}

export default AnnouncementCard;
