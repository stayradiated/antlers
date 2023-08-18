import { errorBoundary } from "@stayradiated/error-boundary";
import { createKyselyDb } from "@stayradiated/antlers-db";
import type {
  Image,
  Location,
  Map,
  Page,
  Sojourn,
  Travel,
  Story,
} from "@stayradiated/antlers-db";

const dbPath = "public/content.db";
const db = createKyselyDb(dbPath);

const getImageList = (): Promise<Pick<Image, "id" | "width" | "height">[]> => {
  return db
    .selectFrom("image")
    .select(["image.id", "image.height", "image.width"])
    .innerJoin("page_image_ref", "page_image_ref.imageId", "image.id")
    .innerJoin("page", "page.id", "page_image_ref.pageId")
    .where(({ or, cmpr }) =>
      or([cmpr("page.type", "=", "sojourn"), cmpr("page.type", "=", "story")]),
    )
    .orderBy("page.id", "desc")
    .execute();
};

const getPageIdList = async (): Promise<string[]> => {
  const pages = await db.selectFrom("page").select(["id"]).execute();
  return pages.map((pages) => pages.id);
};

const getImage = async (id: string): Promise<Image> => {
  const result = await errorBoundary(() =>
    db
      .selectFrom("image")
      .selectAll()
      .where("id", "=", id)
      .executeTakeFirstOrThrow(),
  );

  if (result instanceof Error) {
    throw new Error(`Could not get Image with id "${id}."`, { cause: result });
  }

  return result;
};
const getLocation = async (id: string): Promise<Location> => {
  const result = await errorBoundary(() =>
    db
      .selectFrom("location")
      .selectAll()
      .where("id", "=", id)
      .executeTakeFirstOrThrow(),
  );

  if (result instanceof Error) {
    throw new Error(`Could not get Location with id "${id}."`, {
      cause: result,
    });
  }

  return result;
};
const getMap = async (id: string): Promise<Map> => {
  const result = await errorBoundary(() =>
    db
      .selectFrom("map")
      .selectAll()
      .where("id", "=", id)
      .executeTakeFirstOrThrow(),
  );

  if (result instanceof Error) {
    throw new Error(`Could not get Map with id "${id}."`, { cause: result });
  }

  return result;
};

const getPage = async (id: string): Promise<Page> => {
  const result = await errorBoundary(() =>
    db
      .selectFrom("page")
      .selectAll()
      .where("id", "=", id)
      .executeTakeFirstOrThrow(),
  );

  if (result instanceof Error) {
    throw new Error(`Could not get Page with id "${id}."`, { cause: result });
  }

  return result;
};
const getSojourn = async (id: string): Promise<Sojourn> => {
  const result = await errorBoundary(() =>
    db
      .selectFrom("sojourn")
      .selectAll()
      .where("id", "=", id)
      .executeTakeFirstOrThrow(),
  );

  if (result instanceof Error) {
    throw new Error(`Could not get Sojourn with id "${id}."`, {
      cause: result,
    });
  }

  return result;
};
const getStory = async (id: string): Promise<Story> => {
  const result = await errorBoundary(() =>
    db
      .selectFrom("story")
      .selectAll()
      .where("id", "=", id)
      .executeTakeFirstOrThrow(),
  );

  if (result instanceof Error) {
    throw new Error(`Could not get Story with id "${id}."`, { cause: result });
  }

  return result;
};
const getTravel = async (id: string): Promise<Travel> => {
  const result = await errorBoundary(() =>
    db
      .selectFrom("travel")
      .selectAll()
      .where("id", "=", id)
      .executeTakeFirstOrThrow(),
  );

  if (result instanceof Error) {
    throw new Error(`Could not get Travel with id "${id}."`, { cause: result });
  }

  return result;
};

const getPageImageList = (id: string): Promise<Image[]> => {
  return db
    .selectFrom("image")
    .selectAll()
    .innerJoin("page_image_ref", "page_image_ref.imageId", "image.id")
    .where("page_image_ref.pageId", "=", id)
    .execute();
};

export {
  getSojourn,
  getLocation,
  getImage,
  getMap,
  getPage,
  getStory,
  getTravel,
  getPageIdList,
  getImageList,
  getPageImageList,
};

export type { Image, Location, Map, Page, Sojourn, Story, Travel };
