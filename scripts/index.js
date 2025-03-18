import { DimensionTypes, system, world } from "@minecraft/server";
import EntityScale from "./modules/entityScale";

system.runInterval(() => {
    const dimensionIds = DimensionTypes.getAll().map(dimensionType => dimensionType.typeId);

    for (const dimensionId of dimensionIds) {
        const dimension = world.getDimension(dimensionId);
        const entities = dimension.getEntities();

        for (const entity of entities) {
            const tags = entity.getTags();
            const scaleTags = getScaleTags(tags);

            if (scaleTags.length > 0) {
                const value = getScaleByTag(scaleTags[scaleTags.length - 1]);

                EntityScale.setScale(entity, value);

                for (const scaleTag of scaleTags) {
                    if (scaleTag !== scaleTags[scaleTags.length - 1]) entity.removeTag(scaleTag);
                }
            } else {
                const value = EntityScale.getScale(entity);
                const defValue = EntityScale.getDefaultScale(entity);

                if (value !== defValue) {
                    EntityScale.resetScale(entity);
                }
            }
        }
    }
});

/**
 * @param {string[]} tags 
 * @returns {string[]}
 */
function getScaleTags(tags) {
    let scaleTags = [];

    for (const tag of tags) {
        if (tag.startsWith("scale:")) {
            scaleTags.push(tag);
        }
    }

    return scaleTags;
}

/**
 * @param {string} tag 
 * @returns {string}
 */
function getScaleByTag(tag) {
    return parseFloat(tag.replace("scale:", ""));
}