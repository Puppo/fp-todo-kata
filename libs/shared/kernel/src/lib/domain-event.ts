type SimpleDomainEvent<Name extends string> = Readonly<{
  type: Name;
}>;

type DomainEventWithPayload<Name extends string, Payload> = Readonly<
  SimpleDomainEvent<Name> & {
    payload: Payload;
  }
>;

export type DomainEvent<
  Name extends string,
  T = undefined
> = T extends undefined
  ? SimpleDomainEvent<Name>
  : DomainEventWithPayload<Name, T>;
