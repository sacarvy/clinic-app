import { db } from "$lib/server/db";
import { availability, osteopath } from "$lib/server/db/schema/index";
import { eq } from "drizzle-orm";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
  const osteopathId = event.params.id;
  const data = await db.query.osteopath.findFirst({
    where: eq(osteopath.id, osteopathId),
    with: {
      user:true,
      appointments: true,
      availability: true,
    }
  })
  if(data?.availability.length === 0) {
    data.availability = await db.insert(availability).values([
      {
        osteopathId: osteopathId,
        day: 'sunday',
        startTime: '09:00',
        endTime: '17:00',
      },
      {
        osteopathId: osteopathId,
        day: 'monday',
        startTime: '09:00',
        endTime: '17:00',
      },
      {
        osteopathId: osteopathId,
        day: 'tuesday',
        startTime: '09:00',
        endTime: '17:00',
      },
      {
        osteopathId: osteopathId,
        day: 'wednesday',
        startTime: '09:00',
        endTime: '17:00',
      },
      {
        osteopathId: osteopathId,
        day: 'thursday',
        startTime: '09:00',
        endTime: '17:00',
      },
      {
        osteopathId: osteopathId,
        day: 'friday',
        startTime: '09:00',
        endTime: '17:00',
      },
      {
        osteopathId: osteopathId,
        day: 'saturday',
        startTime: '09:00',
        endTime: '17:00',
      },
    ]).returning()
  }
  return {
    osteopath: {
      name: data?.user.name,
      availability: data?.availability,
      appointments: data?.appointments,
      id:data?.id,
    }
  }
};
