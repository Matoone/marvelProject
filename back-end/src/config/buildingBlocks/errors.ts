/**
 * Représente un élement non trouvé.
 */
export class NotFound<T> extends Error {
  constructor(type: { new (...args: any[]): T });
  constructor(type: string);
  constructor(type: { new (...args: any[]): T } | string) {
    const name = typeof type === 'string' ? type : type.name;
    super(`L'élément ${name} recherché n'a pas été trouvé`);
  }
}

/**
 * Représente une erreur d'autorisation.
 */
export class NotAuthorized extends Error {
  public static readonly DEFAULT_MESSAGE =
    "Vous n'êtes pas autorisé à effectuer cette action";

  constructor(message: string = NotAuthorized.DEFAULT_MESSAGE) {
    super(message);
  }
}
