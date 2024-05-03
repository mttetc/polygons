declare module 'polyclip-ts' {
  export function union(
    poly1: number[][][][],
    poly2: number[][][][],
  ): number[][][][];
  export function intersection(
    poly1: number[][][][],
    poly2: number[][][][],
  ): number[][][][];
}
