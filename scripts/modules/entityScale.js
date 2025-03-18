export default class EntityScale {
    /**
     * @param {Entity} entity 
     * @returns {number | null}
     */
    static getScale(entity) {
        const scaleComponent = entity.getComponent("scale");

        if (scaleComponent) {
            return scaleComponent.value;
        }

        return null;
    }

    /**
     * @param {Entity} entity 
     * @returns {number}
     */
    static getDefaultScale(entity) {
        return entity.getDynamicProperty("defaultScale") || this.getScale(entity);
    }

    /**
     * @param {Entity} entity 
     * @param {number} newValue 
     */
    static setScale(entity, newValue) {
        const scaleComponent = entity.getComponent("scale");

        if (scaleComponent) {
            const defaultScale = entity.getDynamicProperty("defaultScale");

            if (!defaultScale) {
                entity.setDynamicProperty("defaultScale", scaleComponent.value);
            }

            scaleComponent.value = newValue;
        }
    }

    /**
     * @param {Entity} entity 
     */
    static resetScale(entity) {
        const value = this.getDefaultScale(entity);
        const scaleComponent = entity.getComponent("scale");

        if (scaleComponent) {
            scaleComponent.value = value;
        }
    }
}