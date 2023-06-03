import { ProfileCollection } from '/imports/api/profile';

export async function profilePublish() {
    return ProfileCollection.find();
}