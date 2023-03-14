import admin from "firebase-admin";
import { Request, Response, NextFunction } from "express";

export const generateTimeline = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    await admin.firestore().collection("timelines").doc(id).create({});
    const ref = await admin
      .firestore()
      .collection("timelines")
      .doc(id)
      .collection("events")
      .add({});

    res.status(200).json({
      message: "New Timeline Generated",
      result: {
        id: ref.id,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getTimelineEvents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    const snapshot = await admin
      .firestore()
      .collection("timelines")
      .doc(id)
      .collection("events")
      .get();

    const events = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    res.status(200).json({
      message: "Events found",
      result: {
        events,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const saveTimelineEvents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const events = req.body.events as any[];

    const batch = admin.firestore().batch();

    events.forEach((event) => {
      const ref = admin
        .firestore()
        .collection("timelines")
        .doc(id)
        .collection("events")
        .doc();
      batch.set(ref, event);
    });

    await batch.commit();

    res.status(200).json({
      message: "Events saved",
      result: {},
    });
  } catch (error) {
    next(error);
  }
};

export const updateTimelineEvents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const events = req.body.events as any[];

    const batch = admin.firestore().batch();

    events.forEach((event) => {
      const { id: _id, ...rest } = event;

      const ref = admin
        .firestore()
        .collection("timelines")
        .doc(id)
        .collection("events")
        .doc(event.id);

      batch.update(ref, rest);
    });

    await batch.commit();

    res.status(200).json({
      message: "Events updated",
      result: {},
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTimelineEvents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const events = req.body.events as any[];

    const batch = admin.firestore().batch();

    events.forEach((event) => {
      const ref = admin
        .firestore()
        .collection("timelines")
        .doc(id)
        .collection("events")
        .doc(event.id);
      batch.delete(ref);
    });

    await batch.commit();

    res.status(200).json({
      message: "Events deleted",
      result: {},
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTimeline = async ( req: Request, res: Response, next: NextFunction ) => { 
  try { 
    const id = req.params.id; 

    await admin.firestore().collection('timelines').doc(id).delete(); 
    
    res.status(200).json({ 
      message: 'Timeline deleted', 
      result: {}, 
    }); 
  } catch (error) { 
    next(error); 
  } 
}