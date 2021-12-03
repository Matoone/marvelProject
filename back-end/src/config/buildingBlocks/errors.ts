/**
 * Représente un élement non trouvé.
 */
export class NotFound<T> extends Error {
  /**
   * Construit une nouvelle erreur NotFound en passant un constructor en paramètre.
   * Ce constructeur permettra de sortir le nom du type qui n'a pas été trouvé afin
   * d'avoir un peu plus d'informations sur ce qui n'a pas été trouvé.
   */
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
