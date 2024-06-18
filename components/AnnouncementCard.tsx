import { CreatedAt } from "./CreatedAt";

export default async function AnnouncementCard({
  announcement,
}: {
  announcement: any;
}) {
  const severityColor =
    announcement.severity === "info"
      ? "bg-blue-100"
      : announcement.severity === "warning"
      ? "bg-yellow-100"
      : "bg-red-100";
  return (
    <div className={`border border-black w-72 p-4 ${severityColor}`}>
      <h3>{announcement.title}</h3>
      <p>{announcement.content}</p>
      <p>
        Level: <b>{announcement.academicLevel ?? "All"}</b>
      </p>
      Department:{" "}
      <b>
        {announcement.department.length > 0
          ? announcement.department.map((department: any, i: number) => (
              <p key={i}>{department.name.en}</p>
            ))
          : "All"}
      </b>
      <CreatedAt date={announcement.createdAt} />
    </div>
  );
}
