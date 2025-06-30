class GraphqlTransformer {
    transform(input) {
        if (!input.results || !input.results.bindings) {
            return [];
        }

        const transformedContent = input.results.bindings.map((binding) => {
            const { longitude, latitude } = this.extractCoordinates(binding?.coord?.value);
    
            return {
                id: binding.item.value,
                type: binding.typeLabel.value,
                name: binding.itemLabel.value,
                location: {
                    longitude,
                    latitude
                }
            };
        });
    
        return transformedContent;
    }

    extractCoordinates(coordString) {
        if (!coordString) return { longitude: null, latitude: null };

        const match = coordString.match(/Point\(([^ ]+) ([^)]+)\)/);
        if (!match) return { longitude: null, latitude: null };

        return {
            longitude: parseFloat(match[1]),
            latitude: parseFloat(match[2])
        };
    }
}

export const graphqlTransformer = new GraphqlTransformer();
