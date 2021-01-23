export interface VisurlEditorBlockData{
    top: number;
    left: number;
}

export interface VisualEditorModelValue{
    container: {
        width: number;
        height: number;
    };
    blocks: VisurlEditorBlockData[];
}