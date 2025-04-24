import { NextFunction, Request, Response } from "express";
import Ad from "../entities/Ad";
import {ILike, In} from "typeorm";
import DataSource from "../config/db";
import Category from "../entities/Category";
import Tag from "../entities/Tag";

export const getByCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {
    const ads = await Ad.find({
      where: { category: { id: parseInt(req.params.id)}},
      relations: {
        category: true,
        tags: true,
      },
    });
    res.send(ads);
  } catch (err) {
    next(err);
  }
}

export const getFilteredAds = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.params.query as string;
    const ads = await DataSource.getRepository(Ad)
        .createQueryBuilder("ad")
        .leftJoinAndSelect("ad.category", "category")
        .leftJoinAndSelect("ad.tags", "tags")
        .where("ad.title LIKE :query", { query: `%${query}%` })
        .orWhere("ad.description LIKE :query", { query: `%${query}%` })
        .orWhere("category.label LIKE :query", { query: `%${query}%` })
        .orWhere("tags.label LIKE :query", { query: `%${query}%` })
        .getMany();

    res.send(ads);
  } catch (err) {
    next(err)
  }
}

export const getOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ad = await Ad.findOne({
      where: { id: parseInt(req.params.id) },
      relations: {
        category: true,
        tags: true,
      },
    });
    if (!ad) {
      res.status(404).send("Ad not found");
      return;
    }
    res.send(ad);
  } catch (err) {
    next(err);
  }
};

export const getAll = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ads = await Ad.find({
      relations: {
        category: true,
        tags: true,
      },
    });
    res.send(ads);
  } catch (err) {
    next(err);
  }
};

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const ad = new Ad();
  ad.title = req.body.title;
  ad.description = req.body.description;
  ad.author = req.body.author;
  ad.price = req.body.price;
  ad.pictureUrl = req.body.pictureUrl;
  ad.city = req.body.city;
  ad.category = req.body.category;
  ad.tags = req.body.tags.map((tag: string) => ({ id : parseInt(tag)}));

  try {
    await ad.save();
    res.status(201).send("Ad created with success");
  } catch (err) {
    next(err);
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ad = await Ad.findOneBy({ id: parseInt(req.params.id) });
    if (!ad) {
      res.status(404).send("Ad not found");
      return;
    }

    if (req.body.title) ad.title = req.body.title;
    if (req.body.description) ad.description = req.body.description;
    if (req.body.author) ad.author = req.body.author;
    if (req.body.price) ad.price = req.body.price;
    if (req.body.picture_url) ad.pictureUrl = req.body.picture_url;
    if (req.body.city) ad.city = req.body.city;
    if (req.body.category && req.body.category.id) {
      const category = await DataSource.getRepository(Category).findOneBy({ id: req.body.category.id });
      if (category) {
        ad.category = category;
      } else {
        return res.status(400).send("Invalid category");
      }
    }

    if (req.body.tags) {
      const tagIds = req.body.tags.map((tag: { id: number }) => tag.id);
      ad.tags = await DataSource.getRepository(Tag).findBy({ id: In(tagIds) });
    }

    console.log(ad)

    await ad.save();
    res.json(ad)
    //res.status(204).send("Ad updated with success");
  } catch (err) {
    next(err);
  }
};

export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ad = await Ad.findOneBy({ id: parseInt(req.params.id) });
    if (!ad) {
      res.status(404).send("Ad not found");
      return;
    }

    await ad.remove();
    res.send("Deleted with success");
  } catch (err) {
    next(err);
  }
};
